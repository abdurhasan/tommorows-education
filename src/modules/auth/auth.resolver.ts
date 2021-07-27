import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Public } from "src/guards/local.guard";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./dto/input.dto";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly service: AuthService) { }

  @Public()
  @Mutation(() => String)
  async login(@Args("params") params: LoginInput) {
    return await this.service.login(params);
  }

  @Public()
  @Mutation(() => String)
  async register(@Args("params") params: RegisterInput) {
    return await this.service.register(params);
  }
}
