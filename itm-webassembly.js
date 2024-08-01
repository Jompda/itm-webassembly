

const returnCodes = new Map([
    [0, 'Successful execution'],
    [1, 'Successful execution, but warning flags set'],
    [1000, 'TX terminal height is out of range'],
    [1001, 'RX terminal height is out of range'],
    [1002, 'Invalid value for radio climate'],
    [1003, 'Time percentage is out of range'],
    [1004, 'Location percentage is out of range'],
    [1005, 'Situation percentage is out of range'],
    [1006, 'Confidence percentage is out of range'],
    [1007, 'Reliability percentage is out of range'],
    [1008, 'Refractivity is out of range'],
    [1009, 'Frequency is out of range'],
    [1010, 'Invalid value for polarization'],
    [1011, 'Epsilon is out of range'],
    [1012, 'Sigma is out of range'],
    [1013, 'The imaginary portion of the complex impedance is larger than the real portion'],
    [1014, 'Invalid value for mode of variability'],
    [1016, 'Internally computed effective earth radius is invalid'],
    [1017, 'Path distance is out of range'],
    [1018, 'Delta H (terrain irregularity parameter) is out of range'],
    [1019, 'Invalid value for TX siting criteria'],
    [1020, 'Invalid value for RX siting criteria'],
    [1021, 'Internally computed surface refractivity value is too small'],
    [1022, 'Internally computed surface refractivity value is too large'],
])
const warningBits = new Map([
    [0, 'TX terminal height is near its limits'],
    [1, 'RX terminal height is near its limits'],
    [2, 'Frequency is near its limits'],
    [3, 'Path distance is near its upper limit'],
    [4, 'Path distance is large - care must be taken with result'],
    [5, 'Path distance is near its lower limit'],
    [6, 'Path distance is small - care must be taken with result'],
    [7, 'TX horizon angle is large - small angle approximations could break down'],
    [8, 'RX horizon angle is large - small angle approximations could break down'],
    [9, 'TX horizon distance is less than 1/10 of the smooth earth horizon distance'],
    [10, 'RX horizon distance is less than 1/10 of the smooth earth horizon distance'],
    [11, 'TX horizon distance is greater than 3 times the smooth earth horizon distance'],
    [12, 'RX horizon distance is greater than 3 times the smooth earth horizon distance'],
    [13, 'One of the provided variabilities is located far in the tail of its distribution'],
    [14, 'Internally computed surface refractivity value is small - care must be taken with result'],
])


let em_runtime
let ITM_P2P_TLS_Ex_func
let ITM_P2P_CR_Ex_func
let onItmInitializeFunc


window.onItmInitialize = function (callback) {
    onItmInitializeFunc = callback
    if (em_runtime) callback()
}

// Size needed to allocate to struct IntermediateValues
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

// Might need to change to Module all runtime references
Module.onRuntimeInitialized = () => {
    em_runtime = Module

    // Prepare wrappers for the C functions.
    ITM_P2P_TLS_Ex_func = em_runtime.cwrap('EMSCRIPTEN_ITM_P2P_TLS_Ex_str', 'string', [
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
    ITM_P2P_CR_Ex_func = em_runtime.cwrap('EMSCRIPTEN_ITM_P2P_CR_Ex_str', 'string', [
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
        'number', // double confidence
        'number', // double reliability
        'number', // double *A__db
        'number', // long *warnings
        'number'  // IntermediateValues *interValues
    ])
    // TODO: Area functions

    if (onItmInitializeFunc) onItmInitializeFunc()
}


window.ITM_P2P_TLS_Ex = function ITM_P2P_TLS_Ex(
    h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol,
    epsilon, sigma, mdvar, time, location, situation
) {
    if (!em_runtime) throw "Emscripten runtime not initialzed yet!"

    const { ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values } = p2p_allocate(pfl)

    // A string containing key:value pairs separated by |
    const resultStr = ITM_P2P_TLS_Ex_func(
        h_tx__meter, // double h_tx__meter
        h_rx__meter, // double h_rx__meter
        ptr_pfl, // double pfl[]
        climate, // int climate
        N_0, // double N_0
        f__mhz, // double f__mhz
        pol, // int pol
        epsilon, // double epsilon
        sigma, // double sigma
        mdvar, // int mdvar
        time, // double time
        location, // double location
        situation, // double situation
        ptr_A__db, // double *A__db
        ptr_warnings, // long *warnings
        ptr_intermediate_values // IntermediateValues *interValues
    )
    const results = new Map()
    for (const pair of resultStr.split('|')) {
        const parts = pair.split(':')
        results.set(parts[0], parts[1])
    }

    p2p_free(ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values)

    return results
}

window.ITM_P2P_CR_Ex = function ITM_P2P_CR_Ex(
    h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol,
    epsilon, sigma, mdvar, confidence, reliability
) {
    if (!em_runtime) throw "Emscripten runtime not initialzed yet!"

    const { ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values } = p2p_allocate(pfl)

    // A string containing key:value pairs separated by |
    const resultStr = ITM_P2P_CR_Ex_func(
        h_tx__meter, // double h_tx__meter
        h_rx__meter, // double h_rx__meter
        ptr_pfl, // double pfl[]
        climate, // int climate
        N_0, // double N_0
        f__mhz, // double f__mhz
        pol, // int pol
        epsilon, // double epsilon
        sigma, // double sigma
        mdvar, // int mdvar
        confidence, // double confidence
        reliability, // double reliability
        ptr_A__db, // double *A__db
        ptr_warnings, // long *warnings
        ptr_intermediate_values // IntermediateValues *interValues
    )
    const results = new Map()
    for (const pair of resultStr.split('|')) {
        const parts = pair.split(':')
        results.set(parts[0], parts[1])
    }

    p2p_free(ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values)

    return results
}


function p2p_allocate(pfl) {
    const typedPfl = new Float64Array(pfl)
    const ptr_pfl = em_runtime._malloc(typedPfl.length * typedPfl.BYTES_PER_ELEMENT)
    em_runtime.HEAPF64.set(typedPfl, ptr_pfl / 8);
    
    const ptr_A__db = em_runtime._malloc(8) // double
    const ptr_warnings = em_runtime._malloc(8) // long

    const ptr_intermediate_values = em_runtime._malloc(intermediate_values_length)
    return {
        ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values
    }
}

function p2p_free(ptr_pfl, ptr_A__db, ptr_warnings, ptr_intermediate_values) {
    em_runtime._free(ptr_pfl)
    em_runtime._free(ptr_A__db)
    em_runtime._free(ptr_warnings)
    em_runtime._free(ptr_intermediate_values)
}


function resolveReturnCode(code) {
    return returnCodes.get(code)
}
window.resolveReturnCode = resolveReturnCode

function resolveWarnings(warnings) {
    const arr = []
    for (let i = warnings.length - 1, j = 0; i >= 0; --i, ++j)
        if (warnings[i] == '1') arr.push(warningBits.get(j))
    if (arr.length == 0) arr.push('No warning flags')
    return arr
}
window.resolveWarnings = resolveWarnings
