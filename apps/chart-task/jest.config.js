module.exports = {
  name: 'chart-task',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/chart-task',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
