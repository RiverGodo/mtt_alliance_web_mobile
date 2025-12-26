var publicjs = {
    // @if NODE_ENV = 'development'
    env: '开发测试环境',
    // @endif
    // @if NODE_ENV = 'production'
    env: '正式环境',
    // @endif
    // @if NODE_ENV = 'uat'
    env: '客户验收测试环境',
    // @endif
  };