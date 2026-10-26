# Toque 2 (día 3) y toque 3 (día 7) de la tanda 1 del piloto Vibe (enviada el 23-oct-2026, viernes). NO se envía nada.
# Parten del texto v2 ya leído: el toque 2 repite la solución con nombre, alcance y precio SIN afirmar nada técnico en presente
# (el sitio pudo cambiar) y SIN plazo; el toque 3 cierra con el chequeo gratis. Van como respuesta en el mismo hilo.
# Quedan fuera V28 y V44 (rebotaron el 23-oct).
import json
D = {x['id']: x for x in json.load(open('borradores-piloto-vibe.json'))}
TANDA1 = ['V64', 'V08', 'V78', 'V85', 'V19', 'V48', 'V60', 'V70', 'V90', 'V14', 'V31', 'V66', 'V73']
T2, T3 = [], []
for i in TANDA1:
    d = D[i]
    sol = next(p for p in d['cuerpo'] if p.startswith('Lo resuelvo con Verifica y Cumple'))
    saludo = d['cuerpo'][0]
    T2.append(dict(id=i, dominio=d['dominio'], para=d['para'], asunto='Re: ' + d['asunto'],
                   cuerpo=[saludo, f"El viernes te escribí por las cookies de {d['dominio']}.", sol, "Si quieres, lo vemos en una llamada de 20 minutos."],
                   baja=d['baja'], cuando='día 3 (lun 26-oct), como respuesta en el mismo hilo, solo si no hubo respuesta'))
    T3.append(dict(id=i, dominio=d['dominio'], para=d['para'], asunto='Re: ' + d['asunto'],
                   cuerpo=[saludo, "Este es el último correo que te mando sobre esto.", "Dejo el chequeo gratis por si quieres correrlo tú: verifica.spindlelab.cl. Y si en algún momento quieres revisarlo en una llamada de 20 minutos, me escribes."],
                   baja=d['baja'], cuando='día 7 (vie 30-oct), como respuesta en el mismo hilo, solo si no hubo respuesta'))
json.dump(T2, open('borradores-toque2-tanda1.json', 'w'), ensure_ascii=False, indent=1)
json.dump(T3, open('borradores-toque3-tanda1.json', 'w'), ensure_ascii=False, indent=1)
print(len(T2), len(T3))
