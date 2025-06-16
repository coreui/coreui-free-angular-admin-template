// DeepPartial implementation taken from the utility-types NPM package, which is
// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
// and used under the terms of the MIT license
export type DeepPartial<T> = { [P in keyof T]?: _DeepPartial<T[P]> };

/** @private */
export type _DeepPartial<T> = T extends Function
                              ? T
                              : T extends Array<infer U>
                                ? _DeepPartialArray<U>
                                : T extends object
                                  ? DeepPartial<T>
                                  : T | undefined;
/** @private */
export interface _DeepPartialArray<T> extends Array<_DeepPartial<T>> {}
