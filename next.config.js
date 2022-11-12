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
      votingDone: 'votingDone'
    }
  }
};
