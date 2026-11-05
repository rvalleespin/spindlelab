# Seguimientos (toque 2 al día 3 y toque 3 al día 7) para los 11 primeros contactos. NO se envía nada.
# Reglas de la estrategia: máximo 3 toques; van como RESPUESTA en el mismo hilo ("Re:"); solo si no hubo respuesta; la línea de baja va en todos.
# El toque 2 propone lo concreto; el toque 3 cierra sin afirmar nada técnico en presente (el sitio pudo cambiar en una semana).
import json
D=json.load(open('borradores-primer-toque.json'))
T2=[];T3=[]
def saludo(d): return d['cuerpo'][0]
for k,d in enumerate(D):
    dom=d['dominio']; o=d['oferta']; abog = 'estudio' in d['cuerpo'][-2] or 'tu oficio' in ' '.join(d['cuerpo'])
    alt = k%2==1
    if o=='F1':
        revisa = "El texto legal lo revisas tú, que es tu oficio." if 'tu oficio' in ' '.join(d['cuerpo']) else ("El texto legal lo revisan en el estudio." if 'estudio' in ' '.join(d['cuerpo'][3:5]) else "El texto legal lo revisa tu abogado.")
        if not alt:
            p=[f"Hace unos días te escribí por el formulario de contacto de {dom}.",
               f"Lo concreto: dejo un aviso junto al formulario y la política de privacidad enlazada desde el pie, y lo pruebo. Son $149.000 + IVA. {revisa}",
               "Si quieres, lo vemos en una llamada de 20 minutos."]
        else:
            p=[f"Sigo con el correo de hace unos días sobre el formulario de {dom}.",
               f"Lo que hago es simple: pongo el aviso junto al formulario y enlazo la política de privacidad desde el pie. $149.000 + IVA y queda en dos o tres días. {revisa}",
               "Si prefieres verlo antes, lo conversamos en 20 minutos."]
    elif o=='C1':
        if not alt:
            p=[f"Hace unos días te escribí por las cookies de {dom}.",
               "Lo concreto: dejo un aviso de cookies que pregunte antes de guardar esa cookie, y lo pruebo. $149.000 + IVA y queda en dos o tres días.",
               "Si quieres, lo vemos en una llamada de 20 minutos."]
        else:
            p=[f"Sigo con el correo sobre las cookies de {dom}.",
               "Lo que hago es dejar funcionando un aviso que pregunte antes. $149.000 + IVA, dos o tres días.",
               "Si prefieres verlo antes, lo conversamos en 20 minutos."]
    else:  # F10
        p=[f"Hace unos días te escribí por la primera pantalla de {dom} en el celular.",
           "Lo concreto: dejo un botón para contactarlos a la vista desde el primer momento, y lo pruebo en el celular. Los precios de referencia están publicados en spindlelab.cl, y el valor final se cierra en la llamada.",
           "Si quieres, lo vemos en una llamada de 20 minutos y te muestro cómo quedaría."]
    T2.append(dict(id=d['id'],dominio=dom,para=d['para'],asunto='Re: '+d['asunto'],cuerpo=[saludo(d)]+p,baja=d['baja'],cuando='día 3, como respuesta en el mismo hilo, solo si no hubo respuesta'))
    if o=='F10':
        p3=["Este es el último correo que te mando sobre esto.","Si en algún momento quieres arreglar la primera pantalla del sitio, me escribes y lo vemos en 20 minutos. Los precios de referencia están en spindlelab.cl."]
    else:
        p3=["Este es el último correo que te mando sobre esto.","Dejo el chequeo gratis por si quieres correrlo tú: verifica.spindlelab.cl. Y si en algún momento quieres revisarlo en una llamada de 20 minutos, me escribes."]
    T3.append(dict(id=d['id'],dominio=dom,para=d['para'],asunto='Re: '+d['asunto'],cuerpo=[saludo(d)]+p3,baja=d['baja'],cuando='día 7, como respuesta en el mismo hilo, solo si no hubo respuesta'))
json.dump(T2,open('borradores-toque2.json','w'),ensure_ascii=False,indent=1)
json.dump(T3,open('borradores-toque3.json','w'),ensure_ascii=False,indent=1)
print(len(T2),len(T3))
