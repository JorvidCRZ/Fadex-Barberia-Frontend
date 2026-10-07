export const CLIENTE_MENU = [

    {
        label: "Dashboard",
        icon: "pi pi-home",
        routerLink: ["dashboard"],
        routerLinkActiveOptions: { exact: true },
        permission: "CLIENTE_DASHBOARD_READ"
    },

    {
        label: "Reservas",
        icon: "pi pi-calendar",
        routerLink: ["reservas/mis-reservas"],
    },

    {
        label: "Análisis Facial",
        icon: "pi pi-camera",
        routerLink: ["ia/analisis-facial"],
    },

    {
        label: "Historial",
        icon: "pi pi-history",
        routerLink: ["historial"],
        permission: "HISTORIAL_READ"
    },

    {
        label: "Fidelización",
        icon: "pi pi-star",
        routerLink: ["fidelizacion"],
        permission: "FIDELIZACION_READ"
    },

    {
        label: "Perfil",
        icon: "pi pi-user",
        routerLink: ["perfil"],
        permission: "PERFIL_UPDATE"
    }
];