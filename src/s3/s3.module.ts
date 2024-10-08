import { Module, Global } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Global() 
@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: () => {
        return new S3Client({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        });
      },
    },
  ],
  exports: ['S3_CLIENT'],
})

export class S3Module {}
