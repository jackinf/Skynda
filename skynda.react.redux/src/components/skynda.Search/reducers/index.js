import {setIsSearching, toggleAdvanced, setBaseValues, setSearchResults} from "./set.state.values";
import {getClassificationsAsync} from "./get.classification.values";
import {searchCarAsync} from "./make.search";
import changeSearchValues from "./get.search.values";

export function defaultInject(store, injectReducer) {
  injectReducer(store, {key: "isSearching", reducer: setIsSearching});
  injectReducer(store, {key: "showAdvancedSearch", reducer: toggleAdvanced});
  injectReducer(store, {key: "base", reducer: setBaseValues});
  injectReducer(store, {key: "searchValues", reducer: changeSearchValues});
  injectReducer(store, {key: "searchResults", reducer: setSearchResults});
}

export {
  setIsSearching,
  setBaseValues,
  setSearchResults,
  toggleAdvanced,
  changeSearchValues,
  getClassificationsAsync,
  searchCarAsync,
};
