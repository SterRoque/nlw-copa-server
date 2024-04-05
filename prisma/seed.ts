import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Ster Roque",
            email: "ster@linda.com",
            avatarUrl: "https://github.com/Sterzinha.png"
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Bolão do Amor",
            code: "LOVE00",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2024-05-01T12:00:00.108Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR"
        }
    })

    await prisma.game.create({
        data: {
            date: "2024-05-02T12:00:00.108Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 3,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()