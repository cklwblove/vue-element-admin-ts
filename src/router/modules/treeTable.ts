/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout.vue';

const treeTableRouter = {
  path: '/tree-table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'TreeTable',
  meta: {
    title: 'treeTable',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/treeTable/index.vue'),
      name: 'TreeTableDemo',
      meta: {title: 'treeTable'}
    },
    {
      path: 'custom',
      component: () => import('@/views/treeTable/custom/index.vue'),
      name: 'CustomTreeTableDemo',
      meta: {title: 'customTreeTable'}
    }
  ]
};

export default treeTableRouter;
