
export function Clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}

/**
 * Linearly maps `x` in the domain [`min`, `max`] to [`newMin`, `newMax`]
 *
 * @param x        The number to map
 * @param start    The "start" value of `x`, i.e. what mapped `newStart` corresponds to
 * @param end      The "end" value of `x`, i.e. what mapped `newEnd` corresponds to
 * @param newStart The new "start" value of the mapped value, i.e. what `start` corresponds to
 * @param newEnd   The new "end" value of the mapped value, i.e. what `end` corresponds to
 * @returns        A remapped version of `x` between `newStart` and `newMax`
 */
export function Remap(x: number, start: number, end: number, newStart: number, newEnd: number) {
    return Clamp((newEnd - newStart)/(end - start) * (x - start) + newStart, newStart, newEnd);
}

/**
 * Performs a linear normalization of the given number `x` to be between 0 and 1
 *  given the bounds of `x`.
 *
 * @param x     The number to normalize
 * @param start The "start" value of `x`, i.e. what mapped 0 corresponds to
 * @param end   The "end" value of `x`, i.e. what mapped 1 corresponds to
 * @returns     A normalized version of `x` linearly between 0 and 1
 */
export function Normalize(x: number, start: number, end: number) {
    return Remap(x, start, end, 0, 1);
}

/**
 * Performs a non-linear normalization of the given number `x` to be between 0 and 1
 *  using a fractional exponentation with `f` and the bounds of `x`.
 *
 * @param x     The number to normalize
 * @param start The "start" value of `x`, i.e. what mapped 0 corresponds to
 * @param end   The "end" value of `x`, i.e. what mapped 1 corresponds to
 * @param f     The fraction for the
 * @returns     A normalized version of `x` non-linearly between 0 and 1
 */
export function FractionalNormalize(x: number, start: number, end: number, f: number) {
    return Math.pow(1 - Math.pow(1 - Normalize(x, start, end), f), 1/f);
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



export function PolarToCartesian(r: number, a: number, o = { x: 0, y: 0 }) {
    return [r * Math.cos(a) + o.x, r * Math.sin(a) + o.y] as const;
}

export function Rotate(x: number, y: number, a: number) {
    return [
        x * Math.cos(a) - y * Math.sin(a),
        x * Math.sin(a) + y * Math.cos(a),
    ] as const;
}
