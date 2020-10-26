const assert = require('assert');
const MagmaCypher = require('./magma');

describe('MagmaCypher', () => {
  it('should correctly cypher test sample', () => {
    const key =
      'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff';
    const text = 'fedcba9876543210';
    const magma = new MagmaCypher(text, key);
    assert.strictEqual(magma.cypher(), '4e e9 01 e5 c2 d8 ca 3d');
  });
  it('should correctly decypher test sample', () => {
    const key =
      'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff';
    const text = '4ee901e5c2d8ca3d';
    const magma = new MagmaCypher(text, key);
    assert.strictEqual(magma.decypher(), 'fe dc ba 98 76 54 32 10');
  });
});
