import state from 'app-state';

export class Authorization {
  run(instruction, next) {
    let nextConfig = instruction.config;

    if (state.authorized) {
      nextConfig.user = state.authorized;
    }
    return next();
  }
}
