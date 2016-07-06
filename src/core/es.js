export const ES = {};


ES.timeout = function(duration = 0, callback) {
  if (!callback) {
    return new Promise(resolve => {
      runTimeout(resolve, duration);
    })
  }
  runTimeout(callback, duration);
}

function runTimeout(callback, duration = 0) {
  let timeoutId = setTimeout(()=> {
    callback();
    clearTimeout(timeoutId);
  }, duration)
}



/**
 *   Method is similar to Object.assign except assignSafe will only assign if the key exists on either defaults or target
 *   @param  target:Object     The target object to set the properties on
 *   @param  source:Object     The object containing the properties that should be merged with target
 *   @param  options?:Object   Options describing instruction on how the objects should be merged
 *   @return  Object           The modified version of the Object
 */
ES.safeAssign = function(target:Object = {}, source:Object = {}, options?:Object) {
  let assign;
  let prop;
  let key;
  let len;
  let i;

  if (!options) {
    return Object.keys(options).forEach(key => key in target ? target[key] = options[key] : null);
  }

  assign = (key, value)=> {
    if (options.ignoredKeys && ~options.ignoredKeys.indexOf(key)) {
      return;
    }
    if (value === undefined && options.allowUndefined) {
      target[key] = value;
    }
    else if (value === null && options.allowNull) {
      target[key] = value;
    }

    else if ((value === null || target === undefined) && options.defaults) {
      target[key] = options.defaults[key];
    }
    else {
      target[key] = value;
    }
  }

  if (options.keys) {
    len = options.keys.length -1;
    i   = -1;

    while(i++ < len) {
      key  = options.keys[i];
      prop = source[key];
      assign(key, prop);
    }
  }
  return target;
}

