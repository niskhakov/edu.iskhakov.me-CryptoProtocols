import config from './magma.config';
const { P, BLOCK_SIZE, KEY_LENGTH } = config;

const BLOCK_SIZE_BYTES = BLOCK_SIZE / 8;
const KEY_LENGTH_BYTES = KEY_LENGTH / 8;

class MagmaCypher {
  constructor(text, key) {
    this.kview = null; // представление буфера ключа
    this.A = null; // представление вектора A = (A1, A0)
    this.A1 = null; // представление A1
    this.A0 = null; // представление A0
    this.intermediateSteps = []; // промежуточные состояния вектора A
    this.roundKeys = []; // раундовые ключи в порядке использования

    if (text && key) this._init(text, key);
  }

  _init(text, key) {
    if (key.length !== KEY_LENGTH_BYTES * 2) {
      throw new Error(
        `Ключ имеет неверный формат или длину (необходимо ${KEY_LENGTH_BYTES} байт)`
      );
    }

    if (text.length !== BLOCK_SIZE_BYTES * 2) {
      throw new Error(
        `Текст не соответствует размеру блока (${BLOCK_SIZE_BYTES} байт)`
      );
    }

    this.kview = new Uint8Array(new ArrayBuffer(KEY_LENGTH_BYTES));

    for (let i = 0; i < 64; i += 2) {
      this.kview.set([parseInt(key.slice(i, i + 2), 16)], i / 2);
    }

    this.A = new Uint8Array(new ArrayBuffer(BLOCK_SIZE_BYTES));
    hexToBuffer(text, this.A);

    this.A1 = this.A.subarray(0, 4);
    this.A0 = this.A.subarray(4, 8);

    this.intermediateSteps = [];
    this.roundKeys = [];
  }

  cypher() {
    let key;
    for (let i = 1; i < 32; i++) {
      key = roundKey(i, this.kview);
      G(this.A, key);
      this.roundKeys.push(_(key));
      this.intermediateSteps.push(_(this.A));
    }
    key = roundKey(32, this.kview);
    GFin(this.A, key);
    this.roundKeys.push(_(key));
    this.intermediateSteps.push(_(this.A));
    return `${_(this.A)}`;
  }

  decypher() {
    let key;
    for (let i = 32; i > 1; i--) {
      key = roundKey(i, this.kview);
      G(this.A, key);
      this.roundKeys.push(_(key));
      this.intermediateSteps.push(_(this.A));
    }
    key = roundKey(1, this.kview);
    GFin(this.A, key);
    this.roundKeys.push(_(key));
    this.intermediateSteps.push(_(this.A));
    return `${_(this.A)}`;
  }

  getKeys() {
    return this.roundKeys;
  }

  getIntermediateSteps() {
    return this.intermediateSteps;
  }

  reinit(text, key) {
    this._init(text, key);
  }
}

function hexToBuffer(text, bufferView) {
  for (let i = 0; i < text.length; i += 2) {
    bufferView.set([parseInt(text.slice(i, i + 2), 16)], i / 2);
  }
}

function roundKey(i, kview) {
  i--;
  let keyindex;
  if (i >= 0 && i < 24) {
    keyindex = i % 8;
  } else if (i >= 24 && i < 32) {
    keyindex = 7 - (i % 8);
  }

  return kview.subarray(keyindex * 4, (keyindex + 1) * 4);
}

function _(view, join = ' ') {
  let str = [];
  for (let i of view) {
    str.push(
      i.toString(16).length === 1 ? '0'.concat(i.toString(16)) : i.toString(16)
    );
  }
  return str.join(join);
}

function getInt8(view) {
  let int = view[0];
  int = (int << 8) + view[1];
  int = (int << 8) + view[2];
  int = (int << 8) + view[3];
  return int;
}

// function intToBytes(x) {
//   return [x, x << 8, x << 16, x << 24].map((z) => z >>> 24);
// }

function sum32(view, RKview) {
  let int = 0;
  for (let i = 3; i >= 0; i--) {
    int = view[i] + RKview[i] + (int >>> 8);
    view[i] = int & 0xff;
  }
}

// t
function t(A0) {
  let p1, p2;
  for (let i = 0; i < A0.length; i++) {
    p1 = (A0[i] & 0xf0) >>> 4;
    p2 = A0[i] & 0x0f;

    p1 = P[i * 2][p1];
    p2 = P[i * 2 + 1][p2];
    A0.set([(p1 << 4) | p2], i);
  }
}

function circular11shift(view) {
  let int = getInt8(view);
  int = (int << 11) | (int >>> 21);
  view[3] = int; // & 0xff;
  view[2] = int >>> 8; // & 0xff;
  view[1] = int >>> 16; // & 0xff;
  view[0] = int >>> 24; // & 0xff;
}

function g(view, keyView) {
  sum32(view, keyView);
  t(view);
  circular11shift(view);
}

function xor(v1, v2, v) {
  for (let i = 0; i < BLOCK_SIZE_BYTES / 2; i++) {
    v[i] = v1[i] ^ v2[i];
  }
}

function G(bview, roundKeyView) {
  let A1 = bview.subarray(0, 4);
  let A0 = bview.subarray(4, 8);
  let newA1 = new Uint8Array(new ArrayBuffer(BLOCK_SIZE_BYTES / 2));
  // console.log(`>>> A1 A0: ${_(A1)} ${_(A0)}`);
  newA1.set(A0);

  g(A0, roundKeyView);
  // console.log(`>>> interm : A1 A0(g): ${_(A1)} ${_(A0)}`);
  xor(A0, A1, A0);

  A1.set(newA1);
}

function GFin(bview, roundKeyView) {
  let A1 = bview.subarray(0, 4);
  let A0 = bview.subarray(4, 8);
  let tmpA0 = new Uint8Array(new ArrayBuffer(BLOCK_SIZE_BYTES / 2));
  tmpA0.set(A0);

  g(A0, roundKeyView);
  xor(A0, A1, A1);

  A0.set(tmpA0);
}

export default MagmaCypher;
