/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout.vue';

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/componentsDemo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: {title: 'tinymce'}
    },
    {
      path: 'markdown',
      component: () => import('@/views/componentsDemo/markdown.vue'),
      name: 'MarkdownDemo',
      meta: {title: 'markdown'}
    },
    {
      path: 'json-editor',
      component: () => import('@/views/componentsDemo/jsonEditor.vue'),
      name: 'JsonEditorDemo',
      meta: {title: 'jsonEditor'}
    },
    {
      path: 'splitpane',
      component: () => import('@/views/componentsDemo/splitPane.vue'),
      name: 'SplitpaneDemo',
      meta: {title: 'splitPane'}
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/componentsDemo/avatarUpload.vue'),
      name: 'AvatarUploadDemo',
      meta: {title: 'avatarUpload'}
    },
    {
      path: 'dropzone',
      component: () => import('@/views/componentsDemo/dropZone.vue'),
      name: 'DropzoneDemo',
      meta: {title: 'dropzone'}
    },
    {
      path: 'sticky',
      component: () => import('@/views/componentsDemo/sticky.vue'),
      name: 'StickyDemo',
      meta: {title: 'sticky'}
    },
    {
      path: 'count-to',
      component: () => import('@/views/componentsDemo/countTo.vue'),
      name: 'CountToDemo',
      meta: {title: 'countTo'}
    },
    {
      path: 'mixin',
      component: () => import('@/views/componentsDemo/mixin.vue'),
      name: 'ComponentMixinDemo',
      meta: {title: 'componentMixin'}
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/componentsDemo/backToTop.vue'),
      name: 'BackToTopDemo',
      meta: {title: 'backToTop'}
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/componentsDemo/dragDialog.vue'),
      name: 'DragDialogDemo',
      meta: {title: 'dragDialog'}
    },
    {
      path: 'drag-select',
      component: () => import('@/views/componentsDemo/dragSelect.vue'),
      name: 'DragSelectDemo',
      meta: {title: 'dragSelect'}
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/componentsDemo/dndList.vue'),
      name: 'DndListDemo',
      meta: {title: 'dndList'}
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/componentsDemo/dragKanban.vue'),
      name: 'DragKanbanDemo',
      meta: {title: 'dragKanban'}
    }
  ]
};

export default componentsRouter;
