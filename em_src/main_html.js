
/**
 * int EMSCRIPTEN_ITM_P2P_TLS_Ex_str(double h_tx__meter, double h_rx__meter, double *pfl[], int climate, double N_0, double f__mhz,
 *   int pol, double epsilon, double sigma, int mdvar, double time, double location, double situation,
 *   double *A__db, long *warnings, IntermediateValues *interValues);
 */
const EMSCRIPTEN_ITM_P2P_TLS_Ex_str = Module.cwrap('EMSCRIPTEN_ITM_P2P_TLS_Ex_str', 'string', [
    'number', // double h_tx__meter
    'number', // double h_rx__meter
    'number', // double *pfl[]
    'number', // int climate
    'number', // double N_0
    'number', // double f__mhz
    'number', // int pol
    'number', // double epsilon
    'number', // double sigma
    'number', // int mdvar
    'number', // double time
    'number', // double location
    'number', // double situation
    'number', // double *A__db
    'number', // long *warnings
    'number'  // IntermediateValues *interValues
    ])
    console.log('Wrapper for EMSCRIPTEN_ITM_P2P_TLS_Ex_str created.')


    /*
    struct IntermediateValues
    {
        double theta_hzn[2];        // Terminal horizon angles
        double d_hzn__meter[2];     // Terminal horizon distances, in meters
        double h_e__meter[2];       // Terminal effective heights, in meters
        double N_s;                 // Surface refractivity, in N-Units
        double delta_h__meter;      // Terrain irregularity parameter, in meters
        double A_ref__db;           // Reference attenuation, in dB
        double A_fs__db;            // Free space basic transmission loss, in dB
        double d__km;               // Path distance, in km
        int mode;                   // Mode of propagation value
    };
    */

    /* Example TLS options
    h_tx__meter,15
    h_rx__meter,3
    climate,5
    N_0,301
    f__mhz,3500
    pol,1
    epsilon,15
    sigma,0.005
    mdvar,1
    time,50
    location,50
    situation,50
    */

    Module.onRuntimeInitialized = () => {
    console.log('Runtime initialized, initializing variables..')

    // https://stackoverflow.com/questions/71681491/passing-arrays-and-objects-from-javascript-to-c-in-web-assembly
    const rawPfl = [142,25.6,1692,1692,1693,1693,1693,1693,1693,1693,1694,1694,1694,1694,1694,1694,1694,1694,1694,1695,1695,1695,1695,1695,1695,1695,1695,1696,1696,1696,1696,1696,1696,1697,1697,1697,1697,1697,1697,1697,1697,1697,1697,1698,1698,1698,1698,1698,1698,1698,1698,1698,1698,1699,1699,1699,1699,1699,1699,1700,1700,1700,1700,1700,1700,1700,1701,1701,1701,1701,1701,1701,1702,1702,1702,1702,1702,1702,1702,1702,1703,1703,1703,1703,1703,1703,1703,1703,1703,1704,1704,1704,1704,1704,1704,1704,1704,1705,1705,1705,1705,1705,1705,1705,1705,1705,1705,1706,1706,1706,1706,1706,1706,1706,1706,1706,1707,1707,1707,1707,1707,1707,1707,1708,1708,1708,1708,1708,1708,1708,1708,1709,1709,1709,1709,1709,1710,1710,1710,1710,1710,1710,1710,1710,1709]
    const typedPfl = new Float64Array(rawPfl)
    const ptr_pfl = Module._malloc(typedPfl.length * typedPfl.BYTES_PER_ELEMENT)
    // https://github.com/emscripten-core/emscripten/blob/2e48b2debd5e984cde2cee563f4a359a9d688c46/src/preamble.js#L268-L281
    Module.HEAPF64.set(typedPfl, ptr_pfl / 8);

    const ptr_A__db = Module._malloc(8) // double
    const ptr_warnings = Module._malloc(8) // long
    // struct
    const intermediate_values_length =
        8 * 2 // double theta_hzn[2]
        + 8 * 2 // double d_hzn__meter[2]
        + 8 * 2 // double h_e__meter[2]
        + 8 // double N_s
        + 8 // double delta_h__meter
        + 8 // double A_ref__db
        + 8 // double A_fs__db
        + 8 // double d__km
        + 4 // int mode
    const ptr_intermediate_values = Module._malloc(intermediate_values_length)


    console.log('Variables initialized, calling EMSCRIPTEN_ITM_P2P_TLS_Ex_str..')
    const resultStr = EMSCRIPTEN_ITM_P2P_TLS_Ex_str(
        15.0, // double h_tx__meter
        3.0, // double h_rx__meter
        ptr_pfl, // double pfl[]
        5, // int climate
        301.0, // double N_0
        3500.0, // double f__mhz
        1, // int pol
        15.0, // double epsilon
        0.005, // double sigma
        1, // int mdvar
        50.0, // double time
        50.0, // double location
        50.0, // double situation
        ptr_A__db, // double *A__db
        ptr_warnings, // long *warnings
        ptr_intermediate_values // IntermediateValues *interValues
    )

    const results = new Map()
    for (const pair of resultStr.split('|')) {
        const parts = pair.split(':')
        results.set(parts[0], parts[1])
    }
    console.log('Results:', results)

    Module._free(ptr_pfl)
    Module._free(ptr_A__db)
    Module._free(ptr_warnings)
    Module._free(ptr_intermediate_values)
}
