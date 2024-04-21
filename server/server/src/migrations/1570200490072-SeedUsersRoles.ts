import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../domain/user.entity';
import {transformPassword} from '../security';
import {Authority} from '../domain/authority.entity';
import {University} from "../domain/university.entity";
import {Image} from "../domain/image.entity";
import {Files} from "../domain/files.entity";
import {FileType} from "../domain/enumeration/file-type";
import {PanoramaPoints} from "../domain/panorama-points.entity";
import {Direction} from "../domain/direction.entity";
import {EntrySubject} from "../domain/entry-subject.entity";

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

  fileForUniversity3: Image = {
    comment: null,
    date: null,
    imageURL: "feaf4ba4-d780-4aa3-ba2b-1cb205c220bb.jpeg",
    product: null,
    university: null
  };

  fileForUniversity2: Image = {
    comment: null,
    date: null,
    imageURL: "b37b5346-f290-4c65-9a1d-b0b4d4b7f71c.jpeg",
    product: null,
    university: null
  };

  fileForUniversity1: Image = {
    comment: null,
    date: null,
    imageURL: "13aa6b56-5e1e-489a-b4dc-2439fe68336f.jpg",
    product: null,
    university: null
  };

  panoForUniversity1: Files = {
    description: null,
    profile: undefined,
    type: FileType.EO,
    university: null,
    url: "pano1.jpg",
    points: null
  };

  panoForUniversity2: Files = {
    description: null,
    profile: undefined,
    type: FileType.EO,
    university: null,
    url: "pano2.jpg",
    points: null
  };

  panoForUniversity3: Files = {
    description: null,
    profile: undefined,
    type: FileType.EO,
    university: null,
    url: "pano3.jpg",
    points: null
  };

  panoForUniversity4: Files = {
    description: null,
    profile: undefined,
    type: FileType.EO,
    university: null,
    url: "pano4.jpg",
    points: null
  };

  point1ForFile1: PanoramaPoints = {
    file: undefined,
    type: "link",
    yaw: -120,
    pitch: -10,
    text: "Парковка",
    foreignProjectionIndex: 2
  }

  point2ForFile1: PanoramaPoints = {
    file: undefined,
    type: "link",
    yaw: -55,
    pitch: -10,
    text: "Спорт. площадка",
    foreignProjectionIndex: 1
  }

  point3ForFile1: PanoramaPoints = {
    file: undefined,
    type: "link",
    yaw: -210,
    pitch: -10,
    text: "Главный вход",
    foreignProjectionIndex: 3
  }

  point1ForFile2: PanoramaPoints = {
    file: undefined,
    type: "link",
    yaw: -100,
    pitch: -12,
    text: "Главный вход",
    foreignProjectionIndex: 0
  }

  point1ForFile3: PanoramaPoints = {
    file: undefined,
    type: "link",
    yaw: 0,
    pitch: -10,
    text: "Центральные ворота",
    foreignProjectionIndex: 0
  }

  direction1: Direction = {
    disciplines: [],
    name: "09.03.01 Информатика и вычислительная техника",
    university: null
  }

  direction2: Direction = {
    disciplines: [],
    name: "09.03.03 Прикладная информатика",
    university: null
  }

  direction3: Direction = {
    disciplines: [],
    name: "15.03.06 Мехатроника и робототехника",
    university: null
  }

  direction4: Direction = {
    disciplines: [],
    name: "38.04.05 Бизнес-информатика",
    university: null
  }

  subject1: EntrySubject = {
    direction: null,
    examDate: null,
    minimumScore: 30,
    name: "Математика"
  }

  subject2: EntrySubject = {
    direction: null,
    examDate: null,
    minimumScore: 40,
    name: "Русский язык"
  }

  subject3: EntrySubject = {
    direction: null,
    examDate: null,
    minimumScore: 60,
    name: "Физика"
  }

    // eslint-disable-next-line
    public async up(queryRunner: QueryRunner): Promise<any> {
        const authorityRepository = getRepository('nhi_authority');

        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);

        const userRepository = getRepository('nhi_user');

        this.user1.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];
        this.user4.authorities = [userRole];

        const universityRepository = getRepository('university')
        const imagesRepository = getRepository('image')

        await Promise.all([this.user1, this.user2, this.user3, this.user4].map(u => transformPassword(u)));

      const subjectRepository = getRepository('entry_subject')
      await subjectRepository.save([this.subject1, this.subject2, this.subject3])

      const directionRepository = getRepository('direction')
      this.direction1.disciplines = [this.subject1, this.subject2]
      this.direction2.disciplines = [this.subject1, this.subject3]
      this.direction3.disciplines = [this.subject1, this.subject3, this.subject2]
      this.direction4.disciplines = [this.subject3, this.subject1]
      await directionRepository.save(this.direction1)
      await directionRepository.save(this.direction2)
      await directionRepository.save(this.direction3)
      await directionRepository.save(this.direction4)
      this.university1.directions = [this.direction1, this.direction2]
      this.university2.directions = [this.direction1, this.direction3, this.direction4]
      this.university3.directions = [this.direction1, this.direction4, this.direction2]

        await userRepository.save([this.user1, this.user2, this.user3, this.user4]);
        await universityRepository.save([this.university1, this.university2, this.university3]);

        this.fileForUniversity1.university = this.university1;
        this.fileForUniversity2.university = this.university2;
        this.fileForUniversity3.university = this.university3;
        await imagesRepository.save([this.fileForUniversity1, this.fileForUniversity2, this.fileForUniversity3]);


      const pointsRepository = getRepository('panorama_points')
      await pointsRepository.save([this.point1ForFile1, this.point2ForFile1, this.point3ForFile1]);
      await pointsRepository.save([this.point1ForFile2, this.point1ForFile3, this.point1ForFile3])

      const fileRepository = getRepository('files')

      this.panoForUniversity1.university = this.university1
      this.panoForUniversity2.university = this.university1
      this.panoForUniversity3.university = this.university1
      this.panoForUniversity4.university = this.university1
      this.panoForUniversity1.points = [this.point1ForFile1, this.point2ForFile1, this.point3ForFile1,]
      this.panoForUniversity2.points = [this.point1ForFile2, this.point1ForFile3]
      this.panoForUniversity3.points = [this.point1ForFile3]
      await fileRepository.save(this.panoForUniversity1)
      await fileRepository.save(this.panoForUniversity2)
      await fileRepository.save(this.panoForUniversity3)
      await fileRepository.save(this.panoForUniversity4)


    }

    // eslint-disable-next-line
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
