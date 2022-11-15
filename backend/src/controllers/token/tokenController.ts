import { refreshToken } from "../../prisma/client";
import { Token } from "../../provider/accessToken";


const generateToken = new Token();

export class RefreshToken {
  async gen(refreshId: string) {
    const refresh = await refreshToken.findFirst({
      where: {
        id: refreshId,
      },
    });
    if (!refresh) throw "Refresh invalid";

    const token = await generateToken.generateAccessToken(refresh.userId);

    return token
  }

  
}
