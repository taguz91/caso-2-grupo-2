class Adjunto {
  late String createdAt;
  late String updatedAt;
  late int adjuntoId;
  late String url;

  Adjunto({
    required this.createdAt,
    required this.updatedAt,
    required this.adjuntoId,
    required this.url,
  });

  Adjunto.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    adjuntoId = json['adjunto_id'];
    url = json['url'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['adjunto_id'] = this.adjuntoId;
    data['url'] = this.url;
    return data;
  }
}
