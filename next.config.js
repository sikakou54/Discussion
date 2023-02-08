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
    jwt: "eyJraWQiOiJDNTA0XC9QaDVjMU9RaHVqdm42blwvVlpxd0pJWUVaOVdCTTBUTXNvZitrKzA9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhMThjMzQ0NC01NmMzLTQzYzMtYTM0Yi00MTI2M2ZkNjRkMzUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV9OUTdyejZON1QiLCJjb2duaXRvOnVzZXJuYW1lIjoiU2lrYWtvdSIsIm9yaWdpbl9qdGkiOiJiYzk2ODFkMC01Zjk1LTRlYWUtYWQ3Ni0zZTkzOWJhOWRiNDAiLCJhdWQiOiIyYmVxbGpkYTNnZmNranFtaG1iN3BmNDRhaSIsImV2ZW50X2lkIjoiMzdmYjkzN2QtZWJlMS00NGFmLTllOWQtZDc1MDc4ODIzZjRhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzU4MzM2NjIsImV4cCI6MTY3NTgzNzI2MiwiaWF0IjoxNjc1ODMzNjYyLCJqdGkiOiJjMjdjMjhiOC1jY2VkLTQ5YWMtODM3OC0wMzVkY2I5MTEwMTEiLCJlbWFpbCI6InNpa2Frb3UwNTA0QGdtYWlsLmNvbSJ9.D6ruw6pblEeVUDK1SoO2xcjVjWcwJieA41wX9V87QcJL5gyPKeDtPFoU0xHc6zApVhPwYDKGMKezLRdxVWcMXKXfFawpaFWFZ2Wn-dxXfBFwHxyymdVJ5cmMMyMgRg9hZPygVR_GQWe4HX11KFwpDUw7W2WBD_8k8jpIXc4qMVsd6epwzHmTJgjXa2Nx3FEuo_MZRkwNLFCuda17kfeEDYdAsyP9f0Wu68Jptd4dK_VXxH0IMBPLcMPFzHRMmMp2nmgV-nnVGGnSDNUMotuzACTfOjPlDwrweqDe_xK1bQebxJSvOMZ5HJOcTw0xULWLd0f1YGjtpJfKXyO7ZqebFA"
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
