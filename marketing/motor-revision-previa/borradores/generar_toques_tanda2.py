# Toque 2 (jue 29-oct) y toque 3 (lun 2-nov) de la tanda 2 del piloto Vibe, enviada el lun 26-oct ~19:25 UTC. NO se envía nada.
# Misma regla que la tanda 1: el toque 2 repite la solución con nombre, alcance y precio SIN afirmar nada técnico en presente y SIN plazo.
import json
D = {x['id']: x for x in json.load(open('borradores-piloto-vibe.json'))}
TANDA2 = ['V06', 'V07', 'V111', 'V17', 'V20', 'V21', 'V29', 'V30', 'V37', 'V42', 'V43', 'V49', 'V54', 'V57', 'V65']
T2, T3 = [], []
for i in TANDA2:
    d = D[i]
    sol = next(p for p in d['cuerpo'] if p.startswith('Lo resuelvo con Verifica y Cumple'))
    por = f"las cookies de {d['dominio']}" if d['oferta'] == 'C1' else f"el formulario de {d['dominio']}"
    T2.append(dict(id=i, dominio=d['dominio'], para=d['para'], asunto='Re: ' + d['asunto'],
                   cuerpo=[d['cuerpo'][0], f"El lunes te escribí por {por}.", sol, "Si quieres, lo vemos en una llamada de 20 minutos."],
                   baja=d['baja'], cuando='día 3 (jue 29-oct), como respuesta en el mismo hilo, solo si no hubo respuesta'))
    T3.append(dict(id=i, dominio=d['dominio'], para=d['para'], asunto='Re: ' + d['asunto'],
                   cuerpo=[d['cuerpo'][0], "Este es el último correo que te mando sobre esto.", "Dejo el chequeo gratis por si quieres correrlo tú: verifica.spindlelab.cl. Y si en algún momento quieres revisarlo en una llamada de 20 minutos, me escribes."],
                   baja=d['baja'], cuando='día 7 (lun 2-nov), como respuesta en el mismo hilo, solo si no hubo respuesta'))
json.dump(T2, open('borradores-toque2-tanda2.json', 'w'), ensure_ascii=False, indent=1)
json.dump(T3, open('borradores-toque3-tanda2.json', 'w'), ensure_ascii=False, indent=1)
print(len(T2), len(T3))
