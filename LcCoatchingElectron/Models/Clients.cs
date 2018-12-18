using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace LcCoatchingElectron.Models
{
    public class Client
    {
        private DbContext context;

        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public int Telephone { get; set; }
        public DateTime DateNaissance { get; set; }
        public string Genre { get; set; }
        public int Taille { get; set; }
        public float Poids{ get; set; }
        public string Projet { get; set; }

    }
}
