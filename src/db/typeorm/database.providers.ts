import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        // username: 'root',
        // password: '',
        // database: 'bdpetcare_pos',
        username: 'bdpetcare_admin',
        password: 'bdpetcare_admin',
        database: 'bdpetcare_ecom',
        // username: 'dotzdemo_posmain',
        // password: 'dotzdemo_posmain',
        // database: 'dotzdemo_pos_test',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];