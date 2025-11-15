export function onInitialize(callback: Function): void

/**
 * @param {} h_tx__meter double h_tx__meter
 * @param h_rx__meter double h_rx__meter
 * @param pfl double pfl[]
 * @param climate int climate
 * @param N_0 double N_0
 * @param f__mhz double f__mhz
 * @param pol int pol
 * @param epsilon double epsilon
 * @param sigma double sigma
 * @param mdvar int mdvar
 * @param time double time
 * @param location double location
 * @param situation double situation
 */
export function ITM_P2P_TLS_Ex(
    h_tx__meter: number, h_rx__meter: number, pfl: Array<number>, climate: number,
    N_0: number, f__mhz: number, pol: number, epsilon: number, sigma: number,
    mdvar: number, time: number, location: number, situation: number
): Map<string, string>

/**
 * @param h_tx__meter double h_tx__meter
 * @param h_rx__meter double h_rx__meter
 * @param pfl double pfl[]
 * @param climate int climate
 * @param N_0 double N_0
 * @param f__mhz double f__mhz
 * @param pol int pol
 * @param epsilon double epsilon
 * @param sigma double sigma
 * @param mdvar int mdvar
 * @param confidence double confidence
 * @param reliability double reliability
 */
export function ITM_P2P_CR_Ex(
    h_tx__meter: number, h_rx__meter: number, pfl: Array<number>, climate: number,
    N_0: number, f__mhz: number, pol: number, epsilon: number, sigma: number,
    mdvar: number, confidence: number, reliability: number
): Map<string, string>

/**
 * @param h_tx__meter double h_tx__meter
 * @param h_rx__meter double h_rx__meter
 * @param tx_site_criteria int tx_cite_criteria
 * @param rx_site_criteria int rx_cite_criteria
 * @param d__km double d__km
 * @param delta_h__meter double delta_h__meter
 * @param climate int climate
 * @param N_0 double N_0
 * @param f__mhz double f__mhz
 * @param pol int pol
 * @param epsilon double epsilon
 * @param sigma double sigma
 * @param mdvar int mdvar
 * @param time double time
 * @param location double location
 * @param situation double situation
 */
export function ITM_AREA_TLS_Ex(
    h_tx__meter, h_rx__meter, tx_site_criteria, rx_site_criteria, d__km, delta_h__meter,
    climate, N_0, f__mhz, pol, epsilon, sigma, mdvar,
    time, location, situation
): Map<string, string>

/**
 * @param h_tx__meter double h_tx__meter
 * @param h_rx__meter double h_rx__meter
 * @param tx_site_criteria int tx_cite_criteria
 * @param rx_site_criteria int rx_cite_criteria
 * @param d__km double d__km
 * @param delta_h__meter double delta_h__meter
 * @param climate int climate
 * @param N_0 double N_0
 * @param f__mhz double f__mhz
 * @param pol int pol
 * @param epsilon double epsilon
 * @param sigma double sigma
 * @param mdvar int mdvar
 * @param confidence double confidence
 * @param reliability double reliability
 */
export function ITM_AREA_CR_Ex(
    h_tx__meter, h_rx__meter, tx_site_criteria, rx_site_criteria, d__km, delta_h__meter,
    climate, N_0, f__mhz, pol, epsilon, sigma, mdvar,
    confidence, reliability
): Map<string, string>

/**
 * @param pfl double pfl[]
 * @param d_start__meter double d_start__meter
 * @param d_end__meter double d_end__meter
 * @returns delta_h__meter
 */
export function ComputeDeltaH(
    pfl: Array<number>, d_start__meter: number, d_end__meter: number
): number

export function resolveReturnCode(code: number): string
export function resolveWarnings(warnings: string): Array<string>
