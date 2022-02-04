/**
 * Config file to setup user config
 */
module.exports = {
  /**
   * The password allowing users to require the 'Teacher' role.
   */
  teacherPassword: 'change-me!',

  /**
   * A secret key used to encrypt teacher's token
   *
   * Each teacher received a unique encrypted token used to assess the user
   * holds the 'teacher' role.
   *
   * Any user may get the 'teacher' role by requesting it on the user account
   * page and providing the correct teacher password.
   */
  secretKey: 'change-me-as-well',
};