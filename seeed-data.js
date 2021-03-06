const DATA = require('./data');
const pgpPromise = require('pg-options'); //for oprtions//
const dbDetails = {
  database:'robots',
};

const robotsDB =pgpPromise(robotsDB);

robotsDB
  .task('drop-table', (task) => (
    task.none('DROP TABLE robots')
  ))

  .then(() => (
    robotsDB.task('creat-table', () => (
      task.none(
        task.none(`
          CREATE TABLE robots (
            ID SERIAL primary key,
            "username" varchar(30) NOT NULL,
            "name" varchar(40) NOT NULL,
            "avatar" varchar(100),
            "email" varchar(50),
            "university" varchar(50),
            "job" varchar(40),
            "company" varchar(50),
            "phone" varchar(25),
            "street_num" varchar(10),
            "street_name" varchar(50),
            "city" varchar(30),
            "state_or_province" varchar(40),
            "postal_code" varchar(10),
            "country" varchar(50)
          );
      `)
    ))
  ))

  .then(() => {
      console.log('Tables Dropped')
      robotData.users.forEach(user => {
        const newRobot = {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          university: user.university,
          job: user.job,
          company: user.company,
          phone: user.phone,
          street_num: user.address.street_num,
          street_name: user.address.stret_name,
          city: user.address.city,
          state_or_province: user.address.state_or_province,
          postal_code: user.address.postal_code,
          country: user.address.country
        }
        console.log(`Creating DB record for ${newRobot.username}`)
        database
          .one(`INSERT INTO robots (username, name, avatar, email, university, job, company, phone, street_num,
            street_name, city, state_or_province, postal_code, country)
            VALUES($(username), $(name), $(avatar), $(email), $(university), $(job), $(company), $(phone),
            $(street_num), $(street_name), $(city), $(state_or_province), $(postal_code), $(country)) RETURNING id`,
            newRobot)
            .then(newRobotId => {
              user.skills.forEach(skill => {
                const newSkill = {
                  skill: skill,
                  robot_id: newRobotId.id
                }
              database
               .one(`INSERT INTO skills (skill, robot_id)
                  VALUES($(skill), $(robot_id)) RETURNING id`, newSkill)
            })
          })
        })
        console.log('Tables Seeded!')
    })
    .catch(error => {
      console.log(error)
    })
