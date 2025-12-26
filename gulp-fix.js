// Fix for Gulp 3.x compatibility with Node.js 20+
// This fixes the "primordials is not defined" error
const fs = require('fs');
const path = require('path');

// Patch graceful-fs before gulp loads
const Module = require('module');
const originalRequire = Module.prototype.require;

// Store patched modules to avoid re-patching
const patchedModules = new Set();

Module.prototype.require = function(...args) {
  const moduleId = args[0];
  
  // Intercept graceful-fs requires (check both exact match and path contains)
  if (moduleId === 'graceful-fs' || (typeof moduleId === 'string' && moduleId.includes('graceful-fs'))) {
    try {
      const gracefulFs = originalRequire.apply(this, args);
      if (gracefulFs && typeof gracefulFs.gracefulify === 'function' && !patchedModules.has(gracefulFs)) {
        gracefulFs.gracefulify(fs);
        patchedModules.add(gracefulFs);
      }
      return gracefulFs;
    } catch (e) {
      return originalRequire.apply(this, args);
    }
  }
  
  return originalRequire.apply(this, args);
};

// Pre-patch any already loaded graceful-fs instances
try {
  // Try to find and patch graceful-fs in node_modules
  const gracefulFsPaths = [
    'graceful-fs',
    path.join(__dirname, 'node_modules', 'graceful-fs'),
    path.join(__dirname, 'node_modules', 'gulp', 'node_modules', 'vinyl-fs', 'node_modules', 'graceful-fs')
  ];
  
  for (const gracefulFsPath of gracefulFsPaths) {
    try {
      const gracefulFs = require.resolve(gracefulFsPath);
      const gracefulFsModule = require(gracefulFsPath);
      if (gracefulFsModule && typeof gracefulFsModule.gracefulify === 'function') {
        gracefulFsModule.gracefulify(fs);
        patchedModules.add(gracefulFsModule);
      }
    } catch (e) {
      // Ignore, try next path
    }
  }
} catch (e) {
  // Ignore
}

