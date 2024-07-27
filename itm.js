import EM_Module from '../em_bin/itm.mjs'

let em_runtime
let ITM_P2P_TLS_Ex_func
let ITM_P2P_CR_Ex_func
let onInitializeFunc

export function onInitialize(callback) {
    onInitializeFunc = callback
}

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

EM_Module().then((runtime) => {
    em_runtime = runtime

    // Prepare wrappers for the C functions.
    ITM_P2P_TLS_Ex_func = runtime.cwrap('EMSCRIPTEN_ITM_P2P_TLS_Ex_str', 'string', [
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
    ITM_P2P_CR_Ex_func = runtime.cwrap('EMSCRIPTEN_ITM_P2P_CR_Ex_str', 'string', [
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

    onInitializeFunc()
})


export function ITM_P2P_TLS_Ex(
    h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol,
    epsilon, sigma, mdvar, time, location, situation
) {
    if (!em_runtime) throw "Emscripten runtime not initialzed yet!"
    // TODO: external functions for memory allocation and freeing
    // Allocate space for variables
    const typedPfl = new Float64Array(pfl)
    const ptr_pfl = em_runtime._malloc(typedPfl.length * typedPfl.BYTES_PER_ELEMENT)
    em_runtime.HEAPF64.set(typedPfl, ptr_pfl / 8);
    
    const ptr_A__db = em_runtime._malloc(8) // double
    const ptr_warnings = em_runtime._malloc(8) // long

    const ptr_intermediate_values = em_runtime._malloc(intermediate_values_length)

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

    em_runtime._free(ptr_pfl)
    em_runtime._free(ptr_A__db)
    em_runtime._free(ptr_warnings)
    em_runtime._free(ptr_intermediate_values)

    return results
}

export function ITM_P2P_CR_Ex(
    h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol,
    epsilon, sigma, mdvar, confidence, reliability
) {
    if (!em_runtime) throw "Emscripten runtime not initialzed yet!"
    // Allocate space for variables
    const typedPfl = new Float64Array(pfl)
    const ptr_pfl = em_runtime._malloc(typedPfl.length * typedPfl.BYTES_PER_ELEMENT)
    em_runtime.HEAPF64.set(typedPfl, ptr_pfl / 8);
    
    const ptr_A__db = em_runtime._malloc(8) // double
    const ptr_warnings = em_runtime._malloc(8) // long

    const ptr_intermediate_values = em_runtime._malloc(intermediate_values_length)

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

    em_runtime._free(ptr_pfl)
    em_runtime._free(ptr_A__db)
    em_runtime._free(ptr_warnings)
    em_runtime._free(ptr_intermediate_values)

    return results
}
