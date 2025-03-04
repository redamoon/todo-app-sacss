import { GetServerSidePropsContext } from 'next';

class ServerSideLogger {
  private readonly context: GetServerSidePropsContext;

  constructor(context: GetServerSidePropsContext) {
    this.context = context;
  }

  logInfo(message: string): void {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`);
    console.log('Context:', this.context);
  }

  logError(message: string): void {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
    console.error('Context:', this.context);
  }

  logWarning(message: string): void {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`);
    console.warn('Context:', this.context);
  }
}

// 使用例:
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const logger = new ServerSideLogger(context);
//   logger.logInfo('Server-side rendering started.');
//   return { props: {} };
// }