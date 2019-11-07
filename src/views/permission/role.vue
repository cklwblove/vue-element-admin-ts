<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">{{ $t('permission.addRole') }}</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">{{ scope.row.key }}</template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.editPermission') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox
                   node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import path from 'path';
  import { deepClone } from '@/utils';
  import { Tree } from 'element-ui';
  import i18n from '@/lang';
  import { Component, Vue } from 'vue-property-decorator';
  import request from '@/services/request';
  import { SUCCESS_STATUS } from '@/constant';

  interface IRole {
    key: string;
    name: string;
    description: string;
    routes: any[];
  }

  interface IRoute {
    path: string;
    title: string;
    children: any[];
  }

  const defaultRole: IRole = {
    key: '',
    name: '',
    description: '',
    routes: []
  };

  @Component
  export default class Role extends Vue {
    role: IRole = Object.assign({}, defaultRole);
    routes: string[] = [];
    rolesList: any[] = [];
    serviceRoutes: any[] = [];
    dialogVisible: boolean = false;
    dialogType: string = 'new';
    checkStrictly: boolean = false;
    defaultProps: object = {
      children: 'children',
      label: 'title'
    };

    $refs!: {
      tree: Tree
    };

    get routesData() {
      return this.routes;
    }

    created() {
      // Mock: get all routes and roles list from server
      this.getRoutes();
      this.getRoles();
    }

    async getRoutes() {
      const res = await this.$services.getRoutes({method: 'get'});
      const {code, data} = res;
      // console.log('getRoutes', data);
      if (code === SUCCESS_STATUS) {
        this.serviceRoutes = data;
        const routes = this.generateRoutes(data);
        this.routes = this.i18n(routes);
      }
    }

    async getRoles() {
      const res = await this.$services.roles({method: 'get'});
      const {code, data} = res;
      if (code === SUCCESS_STATUS) {
        this.rolesList = data;
      } else {
        this.rolesList = [];
      }

    }

    i18n(routes) {
      const app = routes.map((route) => {
        route.title = i18n.t(`route.${route.title}`);
        if (route.children) {
          route.children = this.i18n(route.children);
        }
        return route;
      });
      return app;
    }

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res: IRoute[] = [];

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue;
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route);

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data: IRoute = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          children: []
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    }

    generateArr(routes) {
      let data: IRoute[] = [];
      routes.forEach((route: IRoute) => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    }

    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = 'new';
      this.dialogVisible = true;
    }

    handleEdit(scope) {
      this.dialogType = 'edit';
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.role = deepClone(scope.row) as IRole;
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes);
        this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
    }

    handleDelete({$index, row}) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async () => {
          await request(`/roles/${row.id}`, {
            method: 'delete'
          });
          this.rolesList.splice($index, 1);
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    generateTree(routes, basePath = '/', checkedKeys) {
      const res: IRoute[] = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys);
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route);
        }
      }
      return res;
    }

    async confirmRole() {
      const isEdit = this.dialogType === 'edit';

      const checkedKeys = this.$refs.tree.getCheckedKeys();
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys);

      if (isEdit) {
        await request(`/roles/${this.role.key}`, {
          method: 'put',
          data: this.role
        });
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role));
            break;
          }
        }
      } else {
        const {data} = await this.$services.roles({data: this.role});
        this.role.key = data;
        this.rolesList.push(this.role);
      }

      const {description, key, name} = this.role;
      this.dialogVisible = false;
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
          <div>Role Key: ${key}</div>
          <div>Role Nmae: ${name}</div>
          <div>Description: ${description}</div>
        `,
        type: 'success'
      });
    }

    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild: any = {};
      const showingChildren = children.filter((item: any) => !item.hidden);

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = {...parent, path: '', noShowingChildren: true};
        return onlyOneChild;
      }

      return false;
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
