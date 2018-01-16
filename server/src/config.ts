export const environment = {
    marketingPortal: process.env.MARKETING_URL || 'http://localhost:8080',
    managementPortal: process.env.ADMIN_URL || 'http://localhost:8181',
    secure: process.env.NODE_ENV === 'PRODUCTION',
    secret: process.env.JWT_SECRET || 'venzra-development',
    imageBucket: process.env.AWS_IMAGE_BUCKET || 'images.venzra-test.com'
};
