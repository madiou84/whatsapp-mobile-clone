import {faker} from '@faker-js/faker';
import {Server, Model, Factory} from 'miragejs';

export function makeServer({environment = 'development'} = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.person.firstName();
        },
        avatarUrl(i) {
          let c = i % 2 ? 'men' : 'women';
          return `https://randomuser.me/api/portraits/${c}/${i}.jpg`;
        },
        title() {
          return faker.person.jobTitle();
        },
        createdAt() {
          return faker.date.future().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          });
        },
        // message: faker.message
      }),
    },

    seeds(server) {
      server.createList('user', 45);
    },

    routes() {
      this.get('/api/users', (schema: any) => {
        return schema.users.all();
      });
    },
  });

  return server;
}
