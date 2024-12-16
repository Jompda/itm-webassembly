# Emscripten cpp build command to expose main functions from the itm project.


# Make bin directory
md -Force .\em_bin\


# EXPOSED FUNCTIONS:
# src/itm_p2p.cpp
## EMSCRIPTEN_ITM_P2P_CR_Ex_str
## EMSCRIPTEN_ITM_P2P_TLS_Ex_str


# Helpful links:
# https://github.com/9oelM/emscripten-cplusplus-webpack-example


# -fdeclspec :
# error: '__declspec' attributes are not enabled; use '-fdeclspec' or '-fms-extensions' to
#      enable support for __declspec attributes

## You can add -03 to optimize for production (see em++ --help)



# browser / js
em++ -fdeclspec -sMODULARIZE=1 -sEXPORTED_FUNCTIONS="['_malloc','_free','_EMSCRIPTEN_ITM_P2P_TLS_Ex_str']" -sEXPORTED_RUNTIME_METHODS='cwrap,ccall,setValue,getValue' -sENVIRONMENT=web -o .\em_bin\.\itm.js $(ls .\src\*.cpp | % {$_.FullName})



# nodejs / module
#em++ $(ls .\src\*.cpp | % {$_.FullName}) -o .\em_bin\.\itm.mjs -fdeclspec -s EXPORTED_FUNCTIONS="['_malloc','_free','_EMSCRIPTEN_ITM_P2P_TLS_Ex_str','_EMSCRIPTEN_ITM_P2P_CR_Ex_str']" -s EXPORTED_RUNTIME_METHODS='cwrap,ccall,setValue,getValue'
