import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Route } from 'vue-router';
import store from '@/store';

export interface ITagsView {
  visitedViews: Route[];
  cachedViews: string[];
}

@Module({dynamic: true, store, name: 'tagsView'})
class TagsView extends VuexModule implements ITagsView {
  public visitedViews: Route[] = [];
  public cachedViews: string[] = [];

  @Action
  public AddView(view: Route) {
    store.dispatch('AddVisitedView', view);
    store.dispatch('AddCachedView', view);
  }

  @Action({commit: 'ADD_VISITED_VIEW'})
  public AddVisitedView(view: Route) {
    return view;
  }

  @Action({commit: 'ADD_CACHED_VIEW'})
  public AddCachedView(view: Route) {
    return view;
  }

  @Action
  public DelView(view: Route) {
    return new Promise((resolve) => {
      store.dispatch('DelVisitedView', view);
      store.dispatch('DelCachedView', view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public DelVisitedView(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_VISITED_VIEW', view);
      resolve([...this.visitedViews]);
    });
  }

  @Action
  public DelCachedView(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_CACHED_VIEW', view);
      resolve([...this.cachedViews]);
    });
  }

  @Action
  public DelOthersViews(view: Route) {
    return new Promise((resolve) => {
      store.dispatch('DelOthersVisitedViews', view);
      store.dispatch('DelOthersCachedViews', view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public DelOthersVisitedViews(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...this.visitedViews]);
    });
  }

  @Action
  public DelOthersCachedViews(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...this.cachedViews]);
    });
  }

  @Action
  public DelAllViews(view?: Route) {
    return new Promise((resolve) => {
      store.dispatch('DelAllVisitedViews', view);
      store.dispatch('DelAllCachedViews', view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public DelAllVisitedViews(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_ALL_VISITED_VIEWS', view);
      resolve([...this.visitedViews]);
    });
  }

  @Action
  public DelAllCachedViews(view: Route) {
    return new Promise((resolve) => {
      store.commit('DEL_ALL_CACHED_VIEWS', view);
      resolve([...this.cachedViews]);
    });
  }

  @Action({commit: 'UPDATE_VISITED_VIEW'})
  public UpdateVisitedView(view: Route) {
    return view;
  }

  @Mutation
  public ADD_VISITED_VIEW(view: Route) {
    if (this.visitedViews.some((v) => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    );
  }

  @Mutation
  public ADD_CACHED_VIEW(view) {
    if (this.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name);
    }
  }

  @Mutation
  public DEL_VISITED_VIEW(view: Route) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_CACHED_VIEW(view: Route) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews.splice(index, 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_OTHERS_VISITED_VIEWS(view: Route) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_OTHERS_CACHED_VIEWS(view: Route) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews = this.cachedViews.slice(index, index + 1);
        break;
      }
    }
  }

  @Mutation
  public DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = [];
  }

  @Mutation
  public DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = [];
  }

  @Mutation
  public UPDATE_VISITED_VIEW(view: Route) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
}

export const TagsViewModule = getModule(TagsView);



