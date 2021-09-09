![example workflow](https://github.com/Nilstrieb/semeru/actions/workflows/main.yml/badge.svg)


[Website](https://nilstrieb.github.io/semeru/)

# Info

SEMERU using Firebase is fully real-time, *every* chagne will be immediately synchronized across all devices.

Every getter in Store does not return a value, but just `Promise<void>`. It takes a callback that gets forwarded to the Firebase/localStorage listener. Every callback will get called directly, and on every proceeding change.

--

SEMERU mit Firebase ist komplett real-time, heisst *jegliche* Änderung wird sofort auf allen Geräten synchronisiert.

Jeder getter im Store returned keinen value, sondern nur einen `Promise<void>`. Er nimmt aber ein Callback an, was er
direkt an einen Firebase-/LocalStorage Listener weiterleitet. So wird das Callback direkt aufgerufen, und dann auch bei
jeder neuen Änderung.

