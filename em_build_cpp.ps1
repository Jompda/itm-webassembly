# Emscripten cpp build command to expose main functions from the itm project.

# src/itm_p2p.cpp 
# int _EMSCRIPTEN_ITM_P2P_TLS_Ex_str(double h_tx__meter, double h_rx__meter, double pfl[], int climate, double N_0, double f__mhz,
#     int pol, double epsilon, double sigma, int mdvar, double time, double location, double situation,
#     double *A__db, long *warnings, IntermediateValues *interValues)

# src/itm_area.cpp // TODO: Write _EMSCRIPTEN_ITM_P2P_CR_Ex_str.
# int _EMSCRIPTEN_ITM_P2P_CR_Ex_str(double h_tx__meter, double h_rx__meter, double pfl[], int climate, double N_0, double f__mhz,
#     int pol, double epsilon, double sigma, int mdvar, double confidence, double reliability,
#     double *A__db, long *warnings, IntermediateValues *interValues);

# // TODO: Export area functions also.

# error: '__declspec' attributes are not enabled; use '-fdeclspec' or '-fms-extensions' to
#      enable support for __declspec attributes

# Make bin directory
md -Force .\em_bin\

# nodejs / js
#em++ $(ls .\src\*.cpp | % {$_.FullName}) -o .\em_bin\.\emscripten.js -fdeclspec -s EXPORTED_FUNCTIONS="['_malloc','_free','_EMSCRIPTEN_ITM_P2P_TLS_Ex_str']" -s EXPORTED_RUNTIME_METHODS='cwrap,ccall,setValue,getValue'

# nodejs / module
em++ $(ls .\src\*.cpp | % {$_.FullName}) -o .\em_bin\.\emscripten.mjs -fdeclspec -s EXPORTED_FUNCTIONS="['_malloc','_free','_EMSCRIPTEN_ITM_P2P_TLS_Ex_str']" -s EXPORTED_RUNTIME_METHODS='cwrap,ccall,setValue,getValue'
