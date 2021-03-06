// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider, ValueOrPromise} from '@loopback/core';
import {inject} from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {JWTStrategy} from '../authentication-strategies/JWT.strategy';
import {JWTAuthenticationBindings} from '../keys';
export class StrategyResolverProvider
  implements Provider<JWTStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @inject(JWTAuthenticationBindings.STRATEGY)
    private jwt_strategy: JWTStrategy,
  ) {}
  value(): ValueOrPromise<JWTStrategy | undefined> {
    if (!this.metadata) {
      return;
    }

    const name = this.metadata.strategy;
    // This should be extensible
    if (name === 'jwt') {
      return this.jwt_strategy;
    } else {
      throw new Error(`The strategy ${name} is not available.`);
    }
  }
}
