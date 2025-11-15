#!/bin/bash
set -e

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

mkdir -p $SCRIPT_DIR/em_bin

em++ -fdeclspec -sMODULARIZE=1 \
    -sEXPORTED_FUNCTIONS="['_malloc','_free','_ComputeDeltaH','_EMSCRIPTEN_ITM_P2P_TLS_Ex_str','_EMSCRIPTEN_ITM_P2P_CR_Ex_str','_EMSCRIPTEN_ITM_AREA_TLS_Ex_str','_EMSCRIPTEN_ITM_AREA_CR_Ex_str']" \
    -sEXPORTED_RUNTIME_METHODS='cwrap,ccall,setValue,getValue,HEAPF64' \
    -sENVIRONMENT=web -o $SCRIPT_DIR/em_bin/itm.js \
    $(ls $SCRIPT_DIR/src/*.cpp)

