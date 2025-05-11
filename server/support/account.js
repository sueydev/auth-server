import { nanoid } from 'nanoid';

const store = new Map();
const logins = new Map();

class Account {
  constructor(id, profile) {
    this.accountId = id || nanoid();
    this.email = 'doug@suey.dev'
    this.profile = profile;
    store.set(this.accountId, this);
  }

  /**
   * @param use - can either be "id_token" or "userinfo", depending on
   *   where the specific claims are intended to be put in.
   * @param scope - the intended scope, while oidc-provider will mask
   *   claims depending on the scope automatically you might want to skip
   *   loading some claims from external resources etc. based on this detail
   *   or not return them in id tokens but only userinfo and so on.
   */
  async claims(use, scope) { // eslint-disable-line no-unused-vars
    console.log("CLAIMS")
    if (this.profile) {
      console.log("CLAIMS1")
      console.log(this.profile);
      return {
        sub: this.accountId, // it is essential to always return a sub claim
        email: this.profile.email,
        // email_verified: this.profile.email_verified,
        // family_name: this.profile.family_name,
        // given_name: this.profile.given_name,
        locale: this.profile.locale,
        // name: this.profile.name,
        // day: this.profile.day
        // name: this.profile
        profile: this.profile
      };
    }

    console("NO PROFILE!")

    return {
      sub: this.accountId, // it is essential to always return a sub claim

      address: {
        country: '000',
        formatted: '000',
        locality: '000',
        postal_code: '000',
        region: '000',
        street_address: '000',
      },
      birthdate: '1987-10-16',
      email: 'johndoe@example.com',
      email_verified: false,
      family_name: 'Doe',
      gender: 'male',
      given_name: 'John',
      locale: 'en-US',
      middle_name: 'Middle',
      name: 'John Doe',
      nickname: 'Johny',
      phone_number: '+49 000 000000',
      phone_number_verified: false,
      picture: 'http://lorempixel.com/400/200/',
      preferred_username: 'johnny',
      profile: 'https://johnswebsite.com',
      updated_at: 1454704946,
      website: 'http://example.com',
      zoneinfo: 'Europe/Berlin',
    };
  }

  static async findByFederated(provider, claims) {
    const id = `${provider}.${claims.sub}`;
    if (!logins.get(id)) {
      logins.set(id, new Account(id, claims));
    }
    return logins.get(id);
  }

  static async findByLogin(login) {
    if (!logins.get(login)) {
      logins.set(login, new Account(login, {
        day: 'thursday', 
        gender: 'male',
        email: 'doogle@gmail.com',
        website: 'suey.dev', 
        given_name: "Doogs",
        profile: {one: "one", two: "two"},
        birthdate: '1987-10-16',
        family_name: 'Doe',
        middle_name: 'Barrett',
        website2: 'test.com'
      }));
    }

    return logins.get(login);
  }

  static async findAccount(ctx, id, token) { // eslint-disable-line no-unused-vars
    // token is a reference to the token used for which a given account is being loaded,
    //   it is undefined in scenarios where account claims are returned from authorization endpoint
    // ctx is the koa request context
    if (!store.get(id)) new Account(id, {day: 'thursday', email2: 'dougbcarroll@gmail.com'}); // eslint-disable-line no-new
    return store.get(id);
  }

  // static async findAccount(ctx, id, token) {
  //   const user  = store.get(id);
  //   console.log("FIND_ACCOUNT")

  //   console.log(user)

  //   console.log("END_FIND_ACCOUNT")

  //   // Fetch user data from your database or any source
  //   //const user = await getUserFromDatabase(sub);

  //   if (!user) return undefined;

  //   return {
  //     accountId: sub,
  //     async claims(use, scope) {
  //       return {
  //         sub,
  //         name: user.name,
  //         email: user.email,
  //         email_verified: user.email_verified,
  //         preferred_username: user.username,
  //       };
  //     },
  //   };
  // }
}

export default Account;
