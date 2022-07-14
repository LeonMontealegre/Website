
export function Clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}

/**
 * Linearly maps `x` in the domain [`min`, `max`] to [`newMin`, `newMax`]
 *
 * @param x The number to map
 * @param min The lower bound of `x`
 * @param max The upper bound of `x`
 * @param newMin The new lower bound
 * @param newMax The new upper bound
 * @returns A remapped version of `x` between `newMin` and `newMax`
 */
export function Remap(x: number, min: number, max: number, newMin: number, newMax: number) {
    return Clamp((newMax - newMin)/(max - min) * (x - min) + newMin, newMin, newMax);
}

/**
 * Performs a linear normalization of the given number `x` to be between 0 and 1
 *  given the bounds of `x`.
 *
 * @param x The number to normalize
 * @param min The lower bound of `x`
 * @param max The upper bound of `x`
 * @returns A normalized version of `x` linearly between 0 and 1
 */
export function Normalize(x: number, min: number, max: number) {
    return Remap(x, min, max, 0, 1);
}

/**
 * Performs a non-linear normalization of the given number `x` to be between 0 and 1
 *  using a fractional exponentation with `f` and the bounds of `x`.
 *
 * @param x The number to normalize
 * @param min The lower bound of `x`
 * @param max The upper bound of `x`
 * @param f The fraction for the
 * @returns A normalized version of `x` non-linearly between 0 and 1
 */
export function FractionalNormalize(x: number, min: number, max: number, f: number) {
    return Math.pow(1 - Math.pow(1 - Normalize(x, min, max), f), 1/f);
}

/**
 * Performs a linear interpolation between `start` and `end`.
 *
 * @param t The "time", which must be a value between 0 and 1
 * @param start The value at t = 0
 * @param end The value at t = 1
 * @returns The interpolation between start and end using `t`
 */
export function Lerp(t: number, start: number, end: number) {
    return (1 - t) * start + (t) * end;
}
