/// <reference types="node" />
interface Digest {
    update(data: string | Buffer | Uint8Array, encoding?: string): this;
    digest(): Buffer;
    digest(encoding: string): string;
}
/**
 * From https://github.com/crypto-browserify/sha.js/blob/master/sha256.js
 *
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */
export declare class sha256js implements Digest {
    static K: number[];
    _block: Buffer;
    _blockSize: number;
    _finalSize: number;
    _len: number;
    _w: number[];
    _a: number;
    _b: number;
    _c: number;
    _d: number;
    _e: number;
    _f: number;
    _g: number;
    _h: number;
    constructor();
    update(data: string | Buffer | Uint8Array, encoding?: string): this;
    digest(): Buffer;
    digest(encoding: string): string;
    private ch;
    private maj;
    private sigma0;
    private sigma1;
    private gamma0;
    private gamma1;
    private _update;
}
export declare class sha256nodeCrypto implements Digest {
    hash: Digest;
    constructor();
    update(data: string | Buffer | Uint8Array, encoding?: string): this;
    digest(): Buffer;
    digest(encoding: string): string;
}
export declare class sha256 implements Digest {
    instance: Digest;
    constructor();
    update(data: string | Buffer | Uint8Array, encoding?: string): this;
    digest(): Buffer;
    digest(encoding: string): string;
}
/**
 * Use Nodejs `crypto` module if available, otherwise uses js implementation.
 * @param data Input data to hash.
 */
export declare function hashSha256(data: Buffer): Buffer;
export default hashSha256;
