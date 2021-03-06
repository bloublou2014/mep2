/** @namespace types */

const Point = require('./Point');

const TAG = 'TunedPoint';

/**
 * Tunable Point. Point coordinates are choose depends on table name in configuration.
 *
 * @author Darko Lukic <lukicdarkoo@gmail.com>
 * @memberof types
 * @example
 * new TunePoint(
 *      150, 129,
 *      [151, 129, 'table_1'],
 *      [148, 128, 'table_2']
 * );
 */
class TunedPoint {
    /**
     * Add multiple Points, add Points for each table. It must has
     * at least one Point which will be used as default. Other Points
     * must have tag!
     *
     * @param defaultX {integer} - Default point X coordinate
     * @param defaultY {integer} - Default point Y coordinate
     */
    constructor(defaultX, defaultY) {
        // If there are table dependent points
        for (let i = 2; i < arguments.length; i++) {

            // Check if the argument is valid
            if (typeof arguments[i][0] === 'undefined' ||
                typeof arguments[i][1] === 'undefined' ||
                typeof arguments[i][2] === 'undefined') {

                Mep.Log.warn(TAG, 'Invalid arguments');
                continue;
            }

            // Check if table name matches
            if (Mep.Config.get('table') == arguments[i][2]) {
                this.point = new Point(arguments[i][0], arguments[i][1]);
            }
        }

        // Otherwise use default point
        if (typeof this.point === 'undefined') {
            this.point = new Point(defaultX, defaultY);
        }
    }

    /**
     * Get point depending on the chosen table in configuration.
     *
     * @returns {Point} - Point
     */
    getPoint() {
        return this.point;
    }
}

module.exports = TunedPoint;
