#include "../include/itm.h"

/*=============================================================================
 |
 | Description: JavaScript helper function.
 |              Converts the result into a machine-readable format.
 |
 | TODO: Figure out how to read struct values directly from JavaScript.
 |
 *===========================================================================*/
const char* resultsToStr(double* A__db, long* warnings, IntermediateValues* interValues, int rtn)
{
    stringstream strs;
    strs << "A_ref__db:" << interValues->A_ref__db << '|';
    strs << "A_fs__db:" << interValues->A_fs__db << '|';
    strs << "delta_h__meter:" << interValues->delta_h__meter << '|';
    strs << "d_hzn__meter:" << interValues->d_hzn__meter[0] << '|';
    strs << "d_hzn__meter:" << interValues->d_hzn__meter[1] << '|';
    strs << "h_e__meter:" << interValues->h_e__meter[0] << '|';
    strs << "h_e__meter:" << interValues->h_e__meter[1] << '|';
    strs << "N_s:" << interValues->N_s << '|';
    strs << "theta_hzn:" << interValues->theta_hzn[0] << '|';
    strs << "theta_hzn:" << interValues->theta_hzn[1] << '|';
    strs << "mode:" << interValues->mode << '|';
    strs << "A__db:" << *A__db << '|';
    strs << "warnings:" << bitset<64>(*warnings) << '|';
    strs << "code:" << rtn;
    return strs.str().c_str();
}

const char* EMSCRIPTEN_ITM_P2P_CR_Ex_str(double h_tx__meter, double h_rx__meter, double pfl[], int climate, double N_0, double f__mhz,
    int pol, double epsilon, double sigma, int mdvar, double confidence, double reliability,
    double* A__db, long* warnings, IntermediateValues* interValues)
{
    int rtn = ITM_P2P_CR_Ex(h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol, epsilon, sigma, mdvar,
        confidence, reliability, A__db, warnings, interValues);

    return resultsToStr(A__db, warnings, interValues, rtn);
}

const char* EMSCRIPTEN_ITM_P2P_TLS_Ex_str(double h_tx__meter, double h_rx__meter, double pfl[], int climate, double N_0, double f__mhz,
    int pol, double epsilon, double sigma, int mdvar, double time, double location, double situation,
    double* A__db, long* warnings, IntermediateValues* interValues)
{
    int rtn = ITM_P2P_TLS_Ex(h_tx__meter, h_rx__meter, pfl, climate, N_0, f__mhz, pol, epsilon, sigma, mdvar,
        time, location, situation, A__db, warnings, interValues);

    return resultsToStr(A__db, warnings, interValues, rtn);
}

const char* EMSCRIPTEN_ITM_AREA_TLS_Ex_str(const double h_tx__meter, const double h_rx__meter, const int tx_site_criteria, const int rx_site_criteria, const double d__km,
    const double delta_h__meter, const int climate, const double N_0, const double f__mhz, const int pol, const double epsilon, const double sigma,
    const int mdvar, const double time, const double location, const double situation, double *A__db, long *warnings, IntermediateValues *interValues)
{
    int rtn = ITM_AREA_TLS_Ex(h_tx__meter, h_rx__meter, tx_site_criteria, rx_site_criteria, d__km, delta_h__meter, climate,
        N_0, f__mhz, pol, epsilon, sigma, mdvar, time, location, situation, A__db, warnings, interValues);

    return resultsToStr(A__db, warnings, interValues, rtn);
}

const char* EMSCRIPTEN_ITM_AREA_CR_Ex_str(const double h_tx__meter, const double h_rx__meter, const int tx_site_criteria, const int rx_site_criteria, const double d__km,
    const double delta_h__meter, const int climate, const double N_0, const double f__mhz, const int pol, const double epsilon, const double sigma,
    const int mdvar, const double confidence, const double reliability, double *A__db, long *warnings, IntermediateValues *interValues)
{
    int rtn = ITM_AREA_CR_Ex(h_tx__meter, h_rx__meter, tx_site_criteria, rx_site_criteria, d__km, delta_h__meter, climate,
        N_0, f__mhz, pol, epsilon, sigma, mdvar, confidence, reliability, A__db, warnings, interValues);

    return resultsToStr(A__db, warnings, interValues, rtn);
}