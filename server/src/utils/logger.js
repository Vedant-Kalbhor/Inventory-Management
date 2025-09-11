function info(...args) {
    // replace with winston if needed
    
    console.log('[INFO]', ...args);
  }
  
  function error(...args) {
    
    console.error('[ERROR]', ...args);
  }
  
  module.exports = { info, error };
  