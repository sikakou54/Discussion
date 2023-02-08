/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    awsCognitConfing: {
      aws_cognito_region: "ap-northeast-1",
      aws_user_pools_id: "ap-northeast-1_NQ7rz6N7T",
      aws_user_pools_web_client_id: "2beqljda3gfckjqmhmb7pf44ai"
    },
    cognitoVerifierConfig: {
      userPoolId: 'ap-northeast-1_NQ7rz6N7T',
      tokenUse: 'id',
      clientId: '2beqljda3gfckjqmhmb7pf44ai',
    },
    awsApiGatewayHttpApiEndPoint: "https://k90g35f81d.execute-api.ap-northeast-1.amazonaws.com",
    awsApiGatewayWebSocketApiEndPoint: "wss://vx92a3mpjf.execute-api.ap-northeast-1.amazonaws.com/production",
    userState: {
      none: 'none',
      select: 'select',
      join: 'join',
      standby: 'standby',
      ready: 'ready',
      online: 'online',
      finish: 'finish',
      vote: 'vote',
      votingDone: 'votingDone',
      result: 'result'
    },
    jwt: "eyJraWQiOiJDNTA0XC9QaDVjMU9RaHVqdm42blwvVlpxd0pJWUVaOVdCTTBUTXNvZitrKzA9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhMThjMzQ0NC01NmMzLTQzYzMtYTM0Yi00MTI2M2ZkNjRkMzUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV9OUTdyejZON1QiLCJjb2duaXRvOnVzZXJuYW1lIjoiU2lrYWtvdSIsIm9yaWdpbl9qdGkiOiJjZGJjNzc0Mi0zYWQ2LTQ5NzYtYTJlYS1lNmYyOTFhMDE3MGIiLCJhdWQiOiIyYmVxbGpkYTNnZmNranFtaG1iN3BmNDRhaSIsImV2ZW50X2lkIjoiY2VjNTlmNzgtNmZjZC00NzFjLTg5ZDItNmYwZmRlZjQ2NWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzU4Mzg0MjQsImV4cCI6MTY3NTg0MjAyNCwiaWF0IjoxNjc1ODM4NDI0LCJqdGkiOiIyNTA2NmFiMC0zNzc4LTQyMjYtYWMxMS1lZDdmNjFlOWI0MzYiLCJlbWFpbCI6InNpa2Frb3UwNTA0QGdtYWlsLmNvbSJ9.NKWQiqmP4a8Jq9vuX3FI4rGqT4LlLfHuY4ielQ-PHmBx8mQSVIWnN9dMFk3hp6alrE1zQHtTYKAZv4CqnE__sa9kfDl1QtOJUp9ddEDpydR2OO2pG9Wx2xvp3l3W3PrijhKpWrLXu79vlMuQDCtJRN36e5AXZAykdTsRGBKq1FGrJClSFuJlDqY1ugMqonucLaGsjqjS9bGzoiFtdXQdo_3kSaBA5Dmr8Yk5F-JB7M6hFwnlYhMk0ATEvzbb-BiY1Mkwb9G2Gn3NwjdKZO2J0bfojhdKSpyV8RBX_bYmRj8ocxW9x8JkvtioyaxivY9CbImmrLQCXreGXUmdMBSFaQ"
  },
  async rewrites() {
    return [
      {
        source: '/getDiscussions/:path*',
        destination: 'https://k90g35f81d.execute-api.ap-northeast-1.amazonaws.com/getDiscussions/:path*',
      },
    ];
  },
};
