[Wireframe](https://www.figma.com/file/WJ5AnYxGfLinsR86R31smc/SEMERU?node-id=0%3A1)
[Website](https://nilstrieb.github.io/semeru/)

# Info

SEMERU mit Firebase ist komplett real-time, heisst *jegliche* Änderung wird sofort auf allen Geräten synchronisiert.

Jeder getter im Store returned keinen value, sondern nur einen `Promise<void>`. Er nimmt aber ein Callback an, was er
direkt an einen Firebase-/LocalStorage Listener weiterleitet. So wird das Callback direkt aufgerufen, und dann auch bei
jeder neuen Änderung.
