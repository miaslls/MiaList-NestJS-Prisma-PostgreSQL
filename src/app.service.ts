export class AppService {
  getStatus(baseUrl: string) {
    return { status: 'server is running! 🏃💨', docs: baseUrl + '/api-docs' };
  }
}
