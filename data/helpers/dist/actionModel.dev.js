"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require('../dbConfig.js');

var mappers = require('./mappers');

module.exports = {
  get: get,
  insert: insert,
  update: update,
  remove: remove
};

function get(id) {
  var query = db('actions');

  if (id) {
    return query.where('id', id).first().then(function (action) {
      if (action) {
        return mappers.actionToBody(action);
      } else {
        return null;
      }
    });
  } else {
    return query.then(function (actions) {
      return actions.map(function (action) {
        return mappers.actionToBody(action);
      });
    });
  }
}

function insert(action) {
  return db('actions').insert(action, 'id').then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        id = _ref2[0];

    return get(id);
  });
}

function update(id, changes) {
  return db('actions').where('id', id).update(changes).then(function (count) {
    return count > 0 ? get(id) : null;
  });
}

function remove(id) {
  return db('actions').where('id', id).del();
}