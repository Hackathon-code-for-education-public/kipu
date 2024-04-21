import {MigrationInterface, QueryRunner, getRepository, Column} from 'typeorm';
import { User } from '../domain/user.entity';
import { transformPassword } from '../security';
import { Authority } from '../domain/authority.entity';
import {University} from "../domain/university.entity";

export class SeedUsersRoles1570200490072 implements MigrationInterface {
    role1: Authority = { name: 'ROLE_ADMIN' };

    role2: Authority = { name: 'ROLE_USER' };

    user1: User = {
        login: 'system',
        password: 'system',
        firstName: 'System',
        lastName: 'System',
        email: 'system@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user2: User = {
        login: 'anonymoususer',
        password: 'anonymoususer',
        firstName: 'Anonymous',
        lastName: 'User',
        email: 'anonymoususer@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user3: User = {
        login: 'admin',
        password: 'admin',
        firstName: 'Administrator',
        lastName: 'Administrator',
        email: 'admin@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user4: User = {
        login: 'user',
        password: 'user',
        firstName: 'User',
        lastName: 'User',
        email: 'user@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

  university1: University = {
    albums: [], comments: [], directions: [], files: [], images: [], products: [],
    name: 'КИПУ имени Февзи Якубова',
    desciption: 'Крымский инженерно-педагогический университет имени Февзи Якубова',
    address: '295015, Республика Крым, г. Симферополь, пер. Учебный, д.8',
    phoneNumber: '+7 (3652) 24-94-95',
    email: 'cepu@crimeaedu.ru',
    site: 'https://kipu-rc.ru/',
    phoneNumbers: '+7 (36561) 6-60-99,+7 (989) 271-43-99',
    emails: 'cepu-ipk@crimeaedu.ru,cepu-kerch@crimeaedu.ru',
    schedule: 'Понедельник – пятница: 8:00 – 17:00 (перерыв на обед: 12:00 – 13:00). Режим рабочего времени работников, отнесенных к профессорско-преподавательскому составу, определяется расписанием занятий',
    responsiblePerson: 'Ибрагимов Таир Шукриевич'
  };

  university2: University = {
    albums: [], comments: [], directions: [], files: [], images: [], products: [],
    name: 'Университет Иннополис',
    desciption: 'Автономная некоммерческая организация высшего образования "Университет Иннополис"',
    address: '420500, Российская Федерация, Республика Татарстан, Верхнеуслонский муниципальный район, город Иннополис, улица Университетская, д. 1',
    phoneNumber: '+7 (843) 203-92-53',
    email: 'university@innopolis.ru',
    site: 'https://innopolis.university',
    phoneNumbers: '+7 843 203-92-53 (275),+7 843 203-92-53 (275)',
    emails: 'university@innopolis.ru',
    schedule: 'пн-пт 9:00-18:00 (время московское)',
    responsiblePerson: 'Семенихин Кирилл Владимирович'
  };

  university3: University = {
    albums: [], comments: [], directions: [], files: [], images: [], products: [],
    name: 'МГИМО-Одинцово',
    desciption: 'Одинцовский филиал Федерального государственного автономного образовательного учреждения высшего образования "Московский государственный институт международных отношений (университет) Министерства иностранных дел Российской Федерации"',
    address: '143007, Московская область, г. Одинцово, ул. Новоспортивная, д.3',
    phoneNumber: '+7 (495) 661-71-22',
    email: 'info@odin.mgimo.ru',
    site: 'https://odin.mgimo.ru',
    phoneNumbers: '+7 (495) 661-71-22,+7 (495) 661-71-22',
    emails: 'info@odin.mgimo.ru,info@odin.mgimo.ru',
    schedule: 'Пн-Сб 8:30-21:30',
    responsiblePerson: 'Мальгин Артем Владимирович'
  };

    // eslint-disable-next-line
    public async up(queryRunner: QueryRunner): Promise<any> {
        const authorityRepository = getRepository('nhi_authority');

        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);

        const userRepository = getRepository('nhi_user');

        this.user1.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];
        this.user4.authorities = [userRole];

        const universityRepository = getRepository('nhi_university')

        await Promise.all([this.user1, this.user2, this.user3, this.user4].map(u => transformPassword(u)));

        await userRepository.save([this.user1, this.user2, this.user3, this.user4]);
        await universityRepository.save([this.university1, this.university2, this.university3])
    }

    // eslint-disable-next-line
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
