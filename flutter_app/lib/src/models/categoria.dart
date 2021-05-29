class Categoria {
  late String createdAt;
  late String updatedAt;
  late int categoriaId;
  late String nombreCategoria;

  Categoria({
    required this.createdAt,
    required this.updatedAt,
    required this.categoriaId,
    required this.nombreCategoria,
  });

  Categoria.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    categoriaId = json['categoria_id'];
    nombreCategoria = json['nombre_categoria'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['categoria_id'] = this.categoriaId;
    data['nombre_categoria'] = this.nombreCategoria;
    return data;
  }
}
