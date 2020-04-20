"use strict";function _slicedToArray(r,t){return _arrayWithHoles(r)||_iterableToArrayLimit(r,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(r,t){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r)){var e=[],n=!0,i=!1,o=void 0;try{for(var a,u=r[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!t||e.length!==t);n=!0);}catch(r){i=!0,o=r}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return e}}function _arrayWithHoles(r){if(Array.isArray(r))return r}var db=require("../dbConfig.js"),mappers=require("./mappers");function get(r){var t=db("actions");return r?t.where("id",r).first().then(function(r){return r?mappers.actionToBody(r):null}):t.then(function(r){return r.map(function(r){return mappers.actionToBody(r)})})}function insert(r){return db("actions").insert(r,"id").then(function(r){return get(_slicedToArray(r,1)[0])})}function update(t,r){return db("actions").where("id",t).update(r).then(function(r){return 0<r?get(t):null})}function remove(r){return db("actions").where("id",r).del()}module.exports={get:get,insert:insert,update:update,remove:remove};